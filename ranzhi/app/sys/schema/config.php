<?php
/**
 * The config file of schema module of RanZhi.
 *
 * @copyright   Copyright 2009-2018 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv12.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     schema 
 * @version     $Id$
 * @link        http://www.ranzhi.org
 */
$config->schema->require = new stdclass();
$config->schema->require->create = 'name,in,out,date,trader';
$config->schema->require->edit   = 'name,money,type,date,trader';
