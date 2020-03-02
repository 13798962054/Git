<?php
/**
 * The allLibs view file of doc module of ZenTaoPMS.
 *
 * @copyright   Copyright 2009-2018 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv12.html)
 * @author      Yidong Wang <yidong@cnezsoft.com>
 * @package     doc
 * @version     $Id$
 * @link        http://www.ranzhi.org
 */
?>
<?php include '../../common/view/header.html.php';?>
<?php js::set('libType', $type);?>
<div id='navBarActions'><?php commonModel::printLink('doc', 'createlib', '', '<i class="icon-plus"></i> ' . $this->lang->doc->createLib, "id='createButton' class='btn btn-primary' data-toggle='modal'");?></div>
<div id='libs'>
  <?php if(($type == 'project')):?>
  <div class='row'>
    <?php foreach($libs as $lib):?>
    <?php if(isset($subLibs[$lib->id])):?>
    <div class='col-md-3'>
      <?php
      $i = 0;
      $subLibCount = count($subLibs[$lib->id]);
      ?>
      <div class='libs-group-heading libs-<?php echo $type?>-heading'>
        <?php
        echo html::a(inlink('projectLibs', "projectID=$lib->id"), $lib->name, "title='{$lib->name}'");
        if($subLibCount > 3) echo html::a(inlink('projectLibs', "projectID=$lib->id"), "{$lang->more}<i class='icon icon-double-angle-right'></i>", "title='{$lang->more}' class='pull-right'");
        ?>
      </div>
      <div class='libs-group clearfix'>
        <?php
        $widthClass = 'w-lib-p100';
        if($subLibCount == 2) $widthClass = 'w-lib-p50';
        if($subLibCount >= 3) $widthClass = 'w-lib-p33';
        ?>
        <?php foreach($subLibs[$lib->id] as $subLibID => $subLibName):?>
        <?php
        if($subLibID == 'project')   $libLink = inlink('allLibs', "type=project");
        elseif($subLibID == 'files') $libLink = inlink('showFiles', "projectID=$lib->id");
        else                         $libLink = inlink('browse', "libID=$subLibID&moduleID=&projectID=$lib->id");
        ?>
        <a class='lib <?php echo $widthClass?>' title='<?php echo $subLibName?>' href='<?php echo $libLink ?>'>
          <i class='icon icon-2x icon-folder-open-alt'></i>
          <div class='lib-name' title='<?php echo $subLibName?>'><?php echo $subLibName?></div>
        </a>
        <?php if($i >= 2) break;?>
        <?php $i++;?>
        <?php endforeach; ?>
      </div>
    </div>
    <?php endif; ?>
    <?php endforeach; ?>
  </div>
  <?php else: ?>
  <div class='clearfix' id='libList'>
    <?php foreach($libs as $lib):?>
    <a class='lib lib-custom' title='<?php echo $lib->name?>' href='<?php echo inlink('browse', "libID=$lib->id") ?>' data-id='<?php echo $lib->id;?>'>
      <i class='icon icon-move'> </i>
      <i class='icon icon-2x icon-folder-open-alt'></i>
      <div class='lib-name' title='<?php echo $lib->name?>'><?php echo $lib->name?></div>
    </a>
    <?php endforeach; ?>
  </div>
  <?php endif; ?>
</div>
<div class='clearfix pager-wrapper'><?php $pager->show();?></div>
<script>
$(function()
{
    $('#libs').css('min-height', $('.outer').height() - $('#featurebar').height() - 60);
})
</script>
<?php include '../../common/view/footer.html.php';?>
