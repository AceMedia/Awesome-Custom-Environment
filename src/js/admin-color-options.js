(function($) {
    function updateColorIndicator(scheme) {
        const $indicator = $('#color-indicator');
        let selectedPalette = $('#custom-admin-color-picker .color-option input[type=radio]:checked')
            .siblings('.color-palette').html();

        $indicator.children('span').addClass('old-palette-shade');
        $indicator.append(`<span class="new-palette">${selectedPalette}</span>`);
        const $newShades = $indicator.find('.new-palette .color-palette-shade');

        setTimeout(function() {
            $indicator.find('.new-palette').removeClass('new-palette');
        }, 500);

        setTimeout(function() {
            $indicator.find('.old-palette-shade').remove();
        }, 1000);
    }

    function applyColorScheme(scheme) {
        let existingLink = $('#admin-color-css');
        if (existingLink.length) {
            existingLink.remove();
        }
        if (scheme === 'fresh') {
            $('#admin-color-css').length && $('#admin-color-css').remove();
            $('#colors-css').length && $('#colors-css').remove();
            return;
        }
        let cssUrl = `${colorOptionsAjax.adminUrl}css/colors/${scheme}/colors.min.css`;
        $('<link>', {
            id: 'admin-color-css',
            rel: 'stylesheet',
            href: cssUrl,
            type: 'text/css'
        }).appendTo('head');
    }

    function updateDayNightTheme(theme) {
        var currentHour = new Date().getHours();
        var isDaytime = currentHour >= 6 && currentHour < 18;
        var dayColorSelected = $('#day_color_scheme').val();
        var nightColorSelected = $('#night_color_scheme').val();

        if (isDaytime && dayColorSelected === '') {
            saveThemeAsDefault(theme);
        } else if (!isDaytime && nightColorSelected === '') {
            saveThemeAsDefault(theme);
        } else {
            $.post(colorOptionsAjax.ajax_url, {
                action: 'set_day_night_color_scheme',
                theme: theme,
                type: isDaytime ? 'day' : 'night',
                nonce: colorOptionsAjax.nonce
            }, function(response) {
                if (response.success) {
                    if (isDaytime && dayColorSelected !== '') {
                        $('#day_color_scheme').val(theme);
                    } else if (!isDaytime && nightColorSelected !== '') {
                        $('#night_color_scheme').val(theme);
                    }
                } else {
                    alert('An error occurred while setting the day/night theme.');
                }
            });
        }
    }

    function saveThemeAsDefault(theme) {
        $.post(colorOptionsAjax.ajax_url, {
            action: 'set_default_color_scheme',
            theme: theme,
            nonce: colorOptionsAjax.nonce
        }, function(response) {
            if (!response.success) {
                alert('An error occurred while setting the default theme.');
            }
        });
    }

    $(document).ready(function() {
        $('#custom-admin-color-picker input[type=radio]').on('mouseenter', function() {
            let colorScheme = $(this).val();
            applyColorScheme(colorScheme);
        }).on('mouseleave', function() {
            let selectedScheme = $('#custom-admin-color-picker input[type=radio]:checked').val();
            applyColorScheme(selectedScheme);
        });

        $('#custom-admin-color-picker input[type=radio]').on('click', function() {
            let colorScheme = $(this).val();
            $(this).closest('.color-option').addClass('selected').siblings().removeClass('selected');
            $.post(colorOptionsAjax.ajax_url, {
                action: 'set_admin_color_scheme',
                color: colorScheme,
                nonce: colorOptionsAjax.nonce
            }, function(response) {
                if (response.success) {
                    applyColorScheme(colorScheme);
                    updateColorIndicator(colorScheme);
                    $('#your-profile input[name=admin_color][value=' + colorScheme + ']').prop('checked', true);
                } else {
                    alert(response.data || 'An error occurred while setting the color scheme.');
                }
            });
        });

        $('#custom-admin-color-picker input[type=radio]').on('click', function() {
            var selectedTheme = $(this).val();
            updateDayNightTheme(selectedTheme);
        });

        $('#your-profile #color-picker .color-option').on('click', function() {
            var colorScheme = $(this).find('input[type=radio]').val();
            $('#custom-admin-color-picker input[type=radio][value=' + colorScheme + ']').click();
        });

        let initialScheme = $('#custom-admin-color-picker input[type=radio]:checked').val();
        updateColorIndicator(initialScheme);
        $('#your-profile input[name=admin_color][value=' + initialScheme + ']').prop('checked', true);
        $('#custom-admin-color-picker input[type=radio][value=' + initialScheme + ']').prop('checked', true)
            .closest('.color-option').addClass('selected').siblings().removeClass('selected');
    });
})(jQuery);