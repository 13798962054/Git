<?php
global $app;
helper::cd($app->getBasePath());
helper::import('/www/wwwroot/ranzhi/app/sys/install/model.php');
helper::cd();
class extinstallModel extends installModel 
{
public function createTable($version)
{
    $result = parent::createTable($version);
    if($result) $this->setXuanxuan();
    return $result;
}

/**
 * Set version and key for xuanxuan.
 *
 * @access public
 * @return bool
 */
public function setXuanxuan()
{
    $sql  = "REPLACE INTO `{$this->config->db->name}`.`{$this->config->db->prefix}sys_config` (`owner`, `app`, `module`, `section`, `key`, `value`) VALUES ('system', 'sys', 'xuanxuan', 'global', 'version', '{$this->config->xuanxuan->version}');";
    $sql .= "REPLACE INTO `{$this->config->db->name}`.`{$this->config->db->prefix}sys_config` (`owner`, `app`, `module`, `section`, `key`, `value`) VALUES ('system', 'sys', 'common', 'xuanxuan', 'key', '" . md5(md5(time()) . rand()). "');";
    try
    {
        $this->dbh->query($sql);
    }
    catch(PDOException $e)
    {
        return false;
    }

    return true;
}
    public function createAdmin()
    {
$this->loadModel('upgrade')->installSSOEntry();
        $admin = new stdclass();
        $admin->account   = $this->post->account;
        $admin->realname  = $this->post->account;
        $admin->password  = $this->loadModel('user')->createPassword($this->post->password, $admin->account);
        $admin->password1 = $this->post->password; 
        $admin->admin     = 'super';
        $admin->join      = helper::now();
        $this->lang->user->password1 = $this->lang->user->password;
        $this->dao->insert(TABLE_USER)->data($admin, $skip = 'password1')->autoCheck()->batchCheck('account,password1', 'notempty')->check('account', 'account')->exec();

        if(dao::isError()) return false;

        /* Update category name by lang. */
        foreach($this->lang->install->categoryList as $id => $name)
        {
            $this->dao->update(TABLE_CATEGORY)->set('name')->eq($name)->where('id')->eq($id)->exec();
        }

        /* Update schema name by lang. */
        foreach($this->lang->install->schemaList as $id => $name)
        {
            $this->dao->update(TABLE_SCHEMA)->set('name')->eq($name)->where('id')->eq($id)->exec();
        }

        /* Update cron remark by lang. */
        foreach($this->lang->install->cronList as $id => $remark)
        {
            $this->dao->update(TABLE_CRON)->set('remark')->eq($remark)->where('id')->eq($id)->exec();
        }

        /* Update group name and desc on dafault lang. */
        $groups = $this->dao->select('*')->from(TABLE_GROUP)->orderBy('id')->fetchAll();
        foreach($groups as $group)
        {
            $data = zget($this->lang->install->groupList, $group->id, '');
            if($data) $this->dao->update(TABLE_GROUP)->data($data)->where('id')->eq($group->id)->exec();
        }

        return !dao::isError();
    }

//**//
}