<?php 
/**
 * The edit view file of product module of RanZhi.
 *
 * @copyright   Copyright 2009-2018 青岛易软天创网络科技有限公司(QingDao Nature Easy Soft Network Technology Co,LTD, www.cnezsoft.com)
 * @license     ZPL (http://zpl.pub/page/zplv12.html)
 * @author      Tingting Dai <daitingting@xirangit.com>
 * @package     product 
 * @version     $Id$
 * @link        http://www.ranzhi.org
 */
?>
<?php include '../../../sys/common/view/header.modal.html.php';?>
<form method='post' action='<?php echo inlink('edit', "productID=$product->id");?>' id='ajaxForm'>
  <table class='table table-form'>
    <tr>
      <th class='w-<?php echo $lang->product->subjectWidth;?>px'><?php echo $lang->product->name;?></th>
      <td>
        <div class="input-group">
          <?php echo html::input('name', $product->name, "class='form-control col-sm-8'");?>
          <span class='input-group-addon fix-border'><?php echo $lang->product->order?></span>
          <?php echo html::input('order', $product->order, "class='form-control'");?>
        </div>
      </td>
    </tr>
    <tr>
      <th><?php echo $lang->product->code;?></th>
      <td><?php echo html::input('code', $product->code, "class='form-control'");?></td>
    </tr>
    <tr>
      <th><?php echo $lang->product->subject;?></th>
      <td><?php echo html::select("subject", $subjects, $product->subject, "class='form-control'");?></td>
    </tr>
    <tr>
      <th><?php echo $lang->product->category;?></th>
      <td><?php echo html::select("category", $categories, $product->category, "class='form-control'");?></td>
    </tr>
    <tr>
      <th><?php echo $lang->product->type;?></th>
      <td><?php echo html::select('type', $lang->product->typeList, $product->type, "class='form-control'");?></td>
    </tr>
    <tr>
      <th><?php echo $lang->product->status;?></th>
      <td><?php echo html::select('status', $lang->product->statusList, $product->status, "class='form-control'");?></td>
    </tr>
    <?php if(commonModel::hasPriv('file', 'upload')):?>
    <tr>
      <th><?php echo $lang->files;?></th>
      <td><?php echo $this->fetch('file', 'buildForm');?></td>
    </tr>
    <?php endif;?>
    <tr>
      <th></th>
      <td><?php echo html::submitButton();?></td>
    </tr>
  </table>
</form>
<?php include '../../../sys/common/view/footer.modal.html.php';?>