$('#post-comment').hide();

$('#btn-toogle-comment').click(e=>{
  e.preventDefault();
  $('#post-comment').slideToggle();//selecciona postcomment y muestra el toogle
});
$('#btn-like').click(function(e){
  e.preventDefault();
  let imgId=$(this).data('id');
  $.post('/images/'+imgId+'/like')
  .done(data=>{
    console.log(data);
    $('.likes-count').text(data.likes);
  });
});

$('#btn-delete').click(function(e){
  e.preventDefault();//cancelamos su evento por defecto
  let $this=$('this');
  const respond=confirm('Are you sure you want to delete this image?');
  if(respond){
    let imgId=$this.data('id');
    console.log(imgId);
    $.ajax({
      url:'/images/'+imgId,
      type:'DELETE'
    }).done(function(result){
      console.log(result);
      $this.removeClass('btn-danger').addClass('btn-success');
      $this.find('i').removeClass('fa-times').addClass('fa-check');
      $this.append('<span>Deleted !! </span');

    })
  } else {

  }
});
