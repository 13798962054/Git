<?php
global $app;
helper::cd($app->getBasePath());
helper::import('/www/wwwroot/ranzhi/app/sys/file/model.php');
helper::cd();
class extfileModel extends fileModel 
{
/**
 * Get xxc all file size. 
 *
 * @access public
 * @return Number 
 */
public function getXxcAllFileSize()
{
    return $this->dao->select('sum(size) as size')->from(TABLE_FILE)->where('objectType')->eq('chat')->fetch('size');
}
//**//
}