// /src/components/ColorOptionsApp.js
import { useState, useEffect } from '@wordpress/element';
import { Button, PanelBody, PanelRow, ColorPalette, TextControl, IconButton, Notice } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

const MAX_COLORS = 5;
const MAX_PALETTES = 10;

const ColorOptionsApp = () => {
    const [palettes, setPalettes] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Load palettes from wp_options on component mount
        apiFetch({ path: '/wp/v2/color-options' })
            .then((data) => {
                if (data && data.palettes) {
                    setPalettes(data.palettes);
                }
            })
            .catch((error) => console.error('Error loading palettes:', error));
    }, []);

    const addPalette = () => {
        if (palettes.length < MAX_PALETTES) {
            const newPalette = { id: Date.now(), name: '', colors: [] };
            setPalettes([...palettes, newPalette]);
        } else {
            setMessage(__('Maximum of 10 palettes allowed.', 'custom-admin-color-options'));
        }
    };

    const addColor = (paletteId) => {
        setPalettes(
            palettes.map(palette =>
                palette.id === paletteId && palette.colors.length < MAX_COLORS
                    ? { ...palette, colors: [...palette.colors, { id: Date.now(), name: '', color: '#000000' }] }
                    : palette
            )
        );
    };

    const updatePaletteName = (paletteId, name) => {
        setPalettes(palettes.map(palette => palette.id === paletteId ? { ...palette, name } : palette));
    };

    const updateColor = (paletteId, colorId, key, value) => {
        setPalettes(palettes.map(palette => {
            if (palette.id === paletteId) {
                return {
                    ...palette,
                    colors: palette.colors.map(color => color.id === colorId ? { ...color, [key]: value } : color)
                };
            }
            return palette;
        }));
    };

    const removeColor = (paletteId, colorId) => {
        setPalettes(
            palettes.map(palette =>
                palette.id === paletteId
                    ? { ...palette, colors: palette.colors.filter(color => color.id !== colorId) }
                    : palette
            )
        );
    };

    const removePalette = (paletteId) => {
        setPalettes(palettes.filter(palette => palette.id !== paletteId));
    };

    const savePalettes = () => {
        apiFetch({
            path: '/wp/v2/color-options',
            method: 'POST',
            data: { palettes }
        }).then(() => {
            setMessage(__('Palettes saved successfully!', 'custom-admin-color-options'));
        }).catch((error) => {
            console.error('Error saving palettes:', error);
            setMessage(__('Error saving palettes.', 'custom-admin-color-options'));
        });
    };

    return (
        <div className="color-options-app">
            <h2>{__('Manage Color Palettes', 'custom-admin-color-options')}</h2>
            {message && <Notice status="info" isDismissible>{message}</Notice>}
            
            {palettes.map((palette) => (
                <PanelBody
                    key={palette.id}
                    title={palette.name || __('Untitled Palette', 'custom-admin-color-options')}
                    initialOpen={true}
                >
                    <TextControl
                        label={__('Palette Name', 'custom-admin-color-options')}
                        value={palette.name}
                        onChange={(value) => updatePaletteName(palette.id, value)}
                        placeholder={__('Enter palette name...', 'custom-admin-color-options')}
                    />

                    {palette.colors.map((color) => (
                        <PanelRow key={color.id} className="color-panel-row">
                            <TextControl
                                label={__('Color Name', 'custom-admin-color-options')}
                                value={color.name}
                                onChange={(value) => updateColor(palette.id, color.id, 'name', value)}
                                placeholder={__('Enter color name...', 'custom-admin-color-options')}
                            />
                            <ColorPalette
                                value={color.color}
                                onChange={(value) => updateColor(palette.id, color.id, 'color', value)}
                                disableCustomColors={false}  // Allows custom colors
                            />
                            <IconButton
                                icon="trash"
                                label={__('Remove Color', 'custom-admin-color-options')}
                                onClick={() => removeColor(palette.id, color.id)}
                                className="remove-color-btn"
                            />
                        </PanelRow>
                    ))}

                    {palette.colors.length < MAX_COLORS && (
                        <PanelRow>
                            <Button isPrimary onClick={() => addColor(palette.id)}>
                                {__('Add New Color', 'custom-admin-color-options')}
                            </Button>
                        </PanelRow>
                    )}

                    <PanelRow>
                        <IconButton
                            icon="trash"
                            label={__('Remove Palette', 'custom-admin-color-options')}
                            onClick={() => removePalette(palette.id)}
                            className="remove-palette-btn"
                        />
                    </PanelRow>
                </PanelBody>
            ))}

            <PanelRow>
                <Button isPrimary onClick={addPalette}>
                    {__('Add New Palette', 'custom-admin-color-options')}
                </Button>
            </PanelRow>

            <PanelRow>
                <Button isSecondary onClick={savePalettes}>
                    {__('Save Palettes', 'custom-admin-color-options')}
                </Button>
            </PanelRow>
        </div>
    );
};

export default ColorOptionsApp;
