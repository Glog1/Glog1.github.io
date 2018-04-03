jQuery(document).ready(function ($) {

    //--------------CF7-----------
    // Notification
    function notification() {
        console.log('notification');
        $('.ns').fadeIn(0, function () {
            $(this).addClass('ns-show');
        });

        $('.ns-close').on('click', function () {
            $('.ns').removeClass('ns-show').addClass('ns-hide');
            setTimeout(function () {
                $('.ns').removeClass('ns-hide').css('display', 'none');
            }, 1000);
        });

    }

    //setTimeout(notification, 1000)

    $('label.file').prependTo( $('label.file').next('*[class*=wpcf7]') );
    $('label.file').html( $('label.file').html() + '<span class="icon-download"></span>' );

    $('form.wpcf7-form').each(function () {
        $(this).prepend('<input type="hidden" name="ip" value="' + client_ip + '">', '<input type="hidden" name="source" value="' + utm.source + '">', '<input type="hidden" name="medium" value="' + utm.medium + '">', '<input type="hidden" name="keyword" value="' + utm.keyword + '">', '<input type="hidden" name="campaign" value="' + utm.campaign + '">', '<input type="hidden" name="page_name" value="' + page_name + '">', '<input type="hidden" name="page_url" value="' + page_url + '">');
    });

    $('body').on('mailsent.wpcf7', '.wpcf7', function (e) {
        var parentform = $('form', e.target);

        if (parentform.closest('.bpopup')) {
            $.fancybox.close();
        }

        $(document).ajaxComplete(function (e) {
            var message_text = parentform.find('.wpcf7-response-output').html();

            console.log(message_text);
            $('.ns .ns-text').html(message_text);

            notification();
            setTimeout(function () {
                $('.ns-close').click();
            }, 5000)


            $(e.currentTarget).unbind('ajaxComplete');
        });
    });

    $('body').on('submit', '.wpcf7', function () {
        $('input', this).prop('disabled', true);
        $('input:submit', this).addClass('loading');
    });

    $('body').on('invalid.wpcf7 spam.wpcf7 mailsent.wpcf7 mailfailed.wpcf7', '.wpcf7', function () {
        $('input', this).prop('disabled', false);
        $('input:submit', this).removeClass('loading');
    });

});