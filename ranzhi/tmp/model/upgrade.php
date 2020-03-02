<?php
global $app;
helper::cd($app->getBasePath());
helper::import('/www/wwwroot/ranzhi/app/sys/upgrade/model.php');
helper::cd();
class extupgradeModel extends upgradeModel 
{
/**
 * Get version of xuanxuan.
 *
 * @access public
 * @return string
 */
public function getXuanxuanVersion()
{
    return !empty($this->config->xuanxuan->global->version) ? $this->config->xuanxuan->global->version : '1.0';
}

/**
 * Upgrade xuanxuan.
 *
 * @param  string $fromVersion
 * @access public
 * @return void
 */
public function upgradeXuanxuan($fromVersion)
{
    switch($fromVersion)
    {
        case '1.0'   : $this->execSQL($this->getUpgradeFile('xuanxuan1.0'));
        case '1.1.0' :
        case '1.1.1' : $this->execSQL($this->getUpgradeFile('xuanxuan1.1.1'));
        case '1.3.0' : $this->execSQL($this->getUpgradeFile('xuanxuan1.3.0'));
        case '1.4.0' : $this->execSQL($this->getUpgradeFile('xuanxuan1.4.0'));
            $this->processMessageStatus();
        case '1.5.0' :
        case '1.6.0' : $this->execSQL($this->getUpgradeFile('xuanxuan1.6.0'));
        case '2.0.0' : $this->execSQL($this->getUpgradeFile('xuanxuan2.0.0'));
			$this->installSSOEntry();
        case '2.1.0' : $this->execSQL($this->getUpgradeFile('xuanxuan2.1.0'));
        case '2.2.0' :
            $this->processUserStatus();
            $this->processXuanxuanKey();
        case '2.3.0' : $this->execSQL($this->getUpgradeFile('xuanxuan2.3.0'));
        case '2.4.0' : $this->execSQL($this->getUpgradeFile('xuanxuan2.4.0'));
            $this->changeMessageStatusTable();
        case '2.5.0' : $this->execSQL($this->getUpgradeFile('xuanxuan2.5.0'));
        case '2.5.1' :
        case '2.5.2' :
        case '2.5.3' :
        case '2.5.4' :
        default : $this->loadModel('setting')->setItem('system.sys.xuanxuan.global.version', $this->config->xuanxuan->version);
    }
}

/**
 * Change status of table user to clientStatus.
 *
 * @access public
 * @return bool
 */
public function processUserStatus()
{
    $hasStatus       = false;
    $hasClientStatus = false;

    $fields = $this->dbh->query('DESC ' . TABLE_USER)->fetchAll();
    foreach($fields as $field)
    {
        if($field->Field == 'status')       $hasStatus = true;
        if($field->Field == 'clientStatus') $hasClientStatus = true;
    }

    if($hasStatus && !$hasClientStatus)
    {
        try
        {
            $this->dbh->exec('ALTER TABLE ' . TABLE_USER . "CHANGE `status` `clientStatus` enum('online', 'away', 'busy', 'offline') NOT NULL DEFAULT 'offline'");
        }
        catch (PDOException $e)
        {
            return false;
        }
    }

    return true;
}

/**
 * Process message status.
 *
 * @access public
 * @return bool
 */
public function processMessageStatus()
{
    $table = $this->dbh->query("SHOW TABLES LIKE '{$this->config->db->prefix}im_usermessage'")->fetch();
    if(empty($table)) return false;

    $userMessages = array();
    $messagesList = $this->dao->select('*')->from($this->config->db->prefix . 'im_usermessage')->fetchAll();
    foreach($messagesList as $messages)
    {
        $user     = $messages->user;
        $messages = json_decode($messages->message);
        foreach($messages as $message)
        {
            if(isset($userMessages[$user][$message->gid])) continue;

            $data = new stdClass();
            $data->user   = $user;
            $data->gid    = $message->gid;
            $data->status = 'waiting';
            $this->dao->insert(TABLE_IM_MESSAGESTATUS)->data($data)->exec();

            $userMessages[$user][$message->gid] = $message->gid;
        }
    }

    return !dao::isError();
}

/**
 * Process key of xuanxuan.
 *
 * @access public
 * @return bool
 */
public function processXuanxuanKey()
{
    $this->loadModel('setting')->setItem('system.sys.common.xuanxuan.key', $this->config->xuanxuan->key);
    $this->setting->deleteItems('owner=system&module=xuanxuan&key=key');
    return !dao::isError();
}

/**
 * Fix the history and Change messagestatus table.
 * @return bool
 */
public function changeMessageStatusTable()
{
    $prefix     = $this->config->db->prefix;
    $errorTable = $this->dbh->query("show tables like '{$prefix}im_messsagestatus'")->fetch();
    if(!empty($errorTable)) $this->dbh->query("RENAME TABLE `{$prefix}im_messsagestatus` TO `{$prefix}im_messagestatus`");
    $needUpdate = false;
    $fields = $this->dbh->query('DESC ' . TABLE_IM_MESSAGESTATUS)->fetchAll();
    foreach($fields as $field)
    {
        if($field->Field == 'gid')
        {
            $needUpdate = true;
            break;
        }
    }
    if(!$needUpdate) return false;

    $gids = $this->dao->select('gid')->from(TABLE_IM_MESSAGESTATUS)->where('status')->ne('sent')->fetchPairs('gid');
    if(!empty($gids))
    {
        $messages = $this->dao->select('gid, id')->from(TABLE_IM_MESSAGE)->where('gid')->in($gids)->fetchPairs();
        foreach($messages as $gid => $message)
        {
            $this->dao->update(TABLE_IM_MESSAGESTATUS)->set('message')->eq($message)->where('gid')->eq($gid)->exec();
        }
    }
    $this->dao->delete()->from(TABLE_IM_MESSAGESTATUS)->where('status')->eq('sent')->exec();

    $this->dbh->exec('ALTER TABLE ' . TABLE_IM_MESSAGESTATUS . ' DROP INDEX `user`;');
    $this->dbh->exec('ALTER TABLE ' . TABLE_IM_MESSAGESTATUS . ' DROP `gid`;');
    $this->dbh->exec('ALTER TABLE ' . TABLE_IM_MESSAGESTATUS . ' ADD UNIQUE INDEX `user` (`user`, `message`);');
    return !dao::isError();
}/**
 * Install sso entry.
 *
 * @access public
 * @return bool
 */
public function installSSOEntry()
{
    $file = new stdclass();
    $file->pathname    = '201810/f_8db2fa542a1e087d63d45d8bc1185361.zip';
    $file->title       = 'sso';
    $file->extension   = 'zip';
    $file->size        = 89674;
    $file->objectType  = 'entry';
    $file->objectID    = 0;
    $file->createdBy   = $this->app->user->account;
    $file->createdDate = helper::now();
    $file->public      = 1;
    $this->dao->insert(TABLE_FILE)->data($file)->exec();

    if(dao::isError()) return false;

    $fileID = $this->dao->lastInsertId();

    $entry = new stdclass();
    $entry->name        = 'sso';
    $entry->abbr        = 'sso';
    $entry->code        = 'sso';
    $entry->buildin     = 1;
    $entry->version     = '1.0.0';
    $entry->platform    = 'xuanxuan';
    $entry->package     = $fileID;
    $entry->integration = 1;
    $entry->open        = 'iframe';
    $entry->key         = '7a171c33d02d172fc0f1cf4cb93edfd6';
    $entry->ip          = '*';
    $entry->logo        = '';
    $entry->login       = 'http://xuan.im';
    $entry->control     = 'none';
    $entry->size        = 'max';
    $entry->position    = 'default';
    $entry->sso         = 1;

    $this->dao->insert(TABLE_ENTRY)->data($entry)->exec();

    $entryID = $this->dao->lastInsertId();

    $this->dao->update(TABLE_FILE)->set('objectID')->eq($entryID)->where('id')->eq($fileID)->exec();

    return !dao::isError();
}
    public function execute($fromVersion)
    {
if((strpos($fromVersion, 'pro') === false && $fromVersion < '4_1') or (strpos($fromVersion, 'pro') !== false && $fromVersion < 'pro2_1'))
{
    $this->execSQL($this->app->getBasepath() . 'db' . DS . 'xuanxuan.sql');

    $this->loadModel('install')->setXuanxuan();
}
else
{
    $xuanxuanVersion = $this->getXuanxuanVersion();

    $this->upgradeXuanxuan($xuanxuanVersion);
}
        $result = array();
    
        /* Delete useless file.*/
        foreach($this->config->delete as $deleteFiles)
        {
            $basePath = $this->app->getBasePath();
            foreach($deleteFiles as $file)
            {
                $fullPath = $basePath . str_replace('/', DIRECTORY_SEPARATOR, $file);
                if(is_dir($fullPath)  and !rmdir($fullPath))  $result[] = sprintf($this->lang->upgrade->deleteDir, $fullPath);
                if(is_file($fullPath) and !unlink($fullPath)) $result[] = sprintf($this->lang->upgrade->deleteFile, $fullPath);
            }
        }
        if(!empty($result)) return array('' => $this->lang->upgrade->deleteTips) + $result;
    
        switch($fromVersion)
        {
            case '1_0_beta':
                $this->execSQL($this->getUpgradeFile('1.0.beta'));
                $this->createCashEntry();
            case '1_1_beta':
                $this->execSQL($this->getUpgradeFile('1.1.beta'));
                $this->createTeamEntry();
            case '1_2_beta':
                $this->execSQL($this->getUpgradeFile('1.2.beta'));
                $this->transformBlock();
                $this->changeBuildinName();
                $this->computeContactInfo();
            case '1_3_beta':
                $this->execSQL($this->getUpgradeFile('1.3.beta'));
                $this->setCompanyContent();
            case '1_4_beta':
                $this->upgradeContractName();
                $this->upgradeProjectMember();
                $this->safeDropColumns(TABLE_PROJECT, 'master,member');

                /* Exec sqls must after fix data. */
                $this->execSQL($this->getUpgradeFile('1.4.beta'));
            case '1_5_beta':
                $this->execSQL($this->getUpgradeFile('1.5.beta'));
                $this->upgradeEntryLogo();
                $this->upgradeReturnRecords();
                $this->upgradeDeliveryRecords();
                $this->addSearchPriv();
            case '1_6':
                $this->execSQL($this->getUpgradeFile('1.6'));
                $this->addPrivs();
            case '1_7':
                $this->toLowerTable();
                $this->updateAppOrder();
            case '2_0':
                $this->execSQL($this->getUpgradeFile('2.0'));
                $this->fixClosedTask();
                $this->setSalesGroup();
                $this->fixOrderProduct();
            case '2_1':
                $this->execSQL($this->getUpgradeFile('2.1'));
            case '2_2':
                $this->processTradeDesc();
            case '2_3':
                $this->processCustomerEditedDate();
                $this->execSQL($this->getUpgradeFile('2.3'));
            case '2_4':
                $this->addAttendPriv();
                $this->execSQL($this->getUpgradeFile('2.4'));
            case '2_5':
                $this->execSQL($this->getUpgradeFile('2.5'));
            case '2_6':
                $this->execSQL($this->getUpgradeFile('2.6'));
            case '2_7':
                $this->processBlockType();
                $this->execSQL($this->getUpgradeFile('2.7'));
            case '3_0':
                $this->execSQL($this->getUpgradeFile('3.0'));
            case '3_1':
                $this->processStatusForContact();
                $this->execSQL($this->getUpgradeFile('3.1'));
            case '3_2':
                $this->execSQL($this->getUpgradeFile('3.2'));
            case '3_2_1':
                $this->execSQL($this->getUpgradeFile('3.2.1'));
            case '3_3':
                $this->execSQL($this->getUpgradeFile('3.3'));
            case '3_4':
                $this->execSQL($this->getUpgradeFile('3.4'));
                $this->updateTradeCategories();
            case '3_5':
                $this->execSQL($this->getUpgradeFile('3.5'));
                $this->setSystemCategories();
                $this->setSalesAdminPrivileges();
            case '3_6':
                $this->execSQL($this->getUpgradeFile('3.6'));
            case '3_7':
                $this->execSQL($this->getUpgradeFile('3.7'));
                $this->updateDocPrivileges();
                $this->moveDocContent();
                $this->addProjectDoc();
            case '4_0': 
                $this->addProjPrivilege(); 
            case '4_1': 
                $this->execSQL($this->getUpgradeFile('4.1'));
                $this->updateMakeupActions();
            case '4_2': 
                $this->execSQL($this->getUpgradeFile('4.2'));
            case '4_2_1': 
                $this->execSQL($this->getUpgradeFile('4.2.1'));
            case '4_2_2':
            case '4_2_3':
            case '4_3_beta': 
                $this->execSQL($this->getUpgradeFile('4.3.beta'));
            case '4_4': 
                $this->processContractAddress();
                $this->execSQL($this->getUpgradeFile('4.4'));
            case '4_5': 
                $this->execSQL($this->getUpgradeFile('4.5'));
                $this->renameLastCategory();
            case '4_6': 
                $this->execSQL($this->getUpgradeFile('4.6'));
                $this->upgradeProductLine();
            case '4_6_1':
                $this->execSQL($this->getUpgradeFile('4.6.1'));
                $this->processDating();
            case '4_6_2':
                $this->execSQL($this->getUpgradeFile('4.6.2'));
            case '4_6_3':
                $this->execSQL($this->getUpgradeFile('4.6.3'));
            case '4_7':
                $this->execSQL($this->getUpgradeFile('4.7'));
            case '4_8':
            case '4_9':
                $this->execSQL($this->getUpgradeFile('4.9'));
                $this->updateContractProduct();
            case '5_0':
                $this->execSQL($this->getUpgradeFile('5.0'));
            case '5_1':
                $this->execSQL($this->getUpgradeFile('5.1'));
                $this->processTeam();
                $this->processContractHandlers();
                $this->processCustomerNextdate();
                $this->processTradesNoCurrency();

            default: if(!$this->isError()) $this->loadModel('setting')->updateVersion($this->config->version);
        }

        $this->deletePatch();
    }

//**//
}