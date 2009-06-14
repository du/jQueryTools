$( function() {
  jQuery.fn.validateThat = function( $regex ) {
    $regex = jQuery.extend({
       cpf: /^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}$/gi,
       cep: /^[0-9]{5}-?[0-9]{3}$/gi,
       phone: /^([0-9]{2}|\([0-9]{2}\))\s?[0-9]{4}-?[0-9]{4}$/gi }, $regex );

    return this.each(function(){ 
      validate_input_value( this, $regex );
    });
  };
});
function validate_input_value( $input, $regex )
{
  if ( $( $input ).is( 'input[type="text"]' ) || $( $input ).is( 'select' ) )
  {
    if ( $( $input ).val() == null 
        || $( $input ).val() == ''
          || $( $input ).val().length == 0 ) 
      show_message_to_field( $input, 'Por favor, não deixe este campo vazio.' );

    else
    {
      $alt = $( $input ).attr( "alt" );
      $value = $( $input ).val();

      if ( $alt == null || $alt == "" || $regex[ $alt ] == null ) 
        hide_message_to_field( $input );

      else
      {
        $alt_regex = $regex[ $alt ];

        if ( $value.replace( $alt_regex, '' ).length == 0 )
          hide_message_to_field( $input );

        else
          show_message_to_field( $input, 'Por favor, preencha este campo corretamente.' );
      }
    }
  }
}
function show_message_to_field( $input, $msg )
{
  var $input = $( $input );
  var $name = $input.attr( 'name' );

  if ( $( '#input_message_' + $name ).length == 0 )
  {
    var $position = $input.position();
    var $left = $position.left + $input.outerWidth() + 10;
    var $top = $position.top;

    $div_content = '<div class="ivm_content"></div>';
    $div_border = '<div class="ivm_border">' + $div_content + '</div>';
    $div_pointer = '<div class="input_validator_message" id="input_message_' + $name + '">' + $div_border + '</div>';

    $( $div_pointer )
      .css( 'position', 'absolute' )
      .css( 'top', $top + 'px' )
      .css( 'left', $left + 'px' )
      .appendTo( 'body' );
  }
  $( '#input_message_' + $name + ' .ivm_content' ).html( $msg );
  $( '#input_message_' + $name ).show();
}
function hide_message_to_field( $input )
{ 
  var $input = $( $input );
  var $name = $input.attr( 'name' );

  $( '#input_message_' + $name + ' .ivm_content' ).html( '' );
  $( '#input_message_' + $name ).hide();
}
