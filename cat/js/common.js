$(function() {

    var $card = $('.card');
    var $buyLink = $('.product__link');
    var $disabled = 'js-disabled';
    var $hovered = 'js-hovered';
    var $selected = 'js-selected';

    //Click
    $.fn.selectCard = function() {
        this.on('click', function(e) {
            var $product = $(this).parents($product);
            if ($product.hasClass($disabled) === false) {
                $product.toggleClass($selected);
            }
        });
    };

    $card.selectCard();

    $buyLink.selectCard();


    //Hover
    $card.hover(function(e) {
        var $product = $(this).parents('.product');
        if ($product.hasClass($selected)) {
            $product.addClass($hovered);
        }
    }, function(e) {
        $(this).parents('.product').removeClass($hovered);
    });

});
