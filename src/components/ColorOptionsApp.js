import { useState, useEffect } from '@wordpress/element';
import { 
    Button, 
    PanelRow, 
    ColorPalette, 
    IconButton, 
    Notice, 
    TextControl, 
    Card, 
    CardHeader,
    PanelBody 
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

const ColorOptionsApp = () => {
    const [palettes, setPalettes] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        apiFetch({ path: '/wp/v2/color-options' })
            .then((data) => {
                if (data && data.palettes) {
                    // Add 'isOpen' property to each palette to manage the collapse state
                    setPalettes(data.palettes.map(palette => ({ ...palette, isOpen: false })));
                }
            })
            .catch((error) => console.error('Error loading palettes:', error));
    }, []);

    const addPalette = () => {
        const newPalette = {
            id: Date.now(),
            name: '',
            colors: Array.from({ length: 5 }, () => ({ id: Date.now() + Math.random(), color: '#000000' })),
            isOpen: true // New palettes are open by default
        };
        setPalettes([...palettes.map(p => ({ ...p, isOpen: false })), newPalette]);
    };

    const togglePaletteOpen = (paletteId) => {
        setPalettes(palettes.map(palette => 
            palette.id === paletteId 
                ? { ...palette, isOpen: !palette.isOpen } 
                : { ...palette, isOpen: false } // Collapse all others
        ));
    };

    const updatePaletteName = (paletteId, name) => {
        setPalettes(palettes.map(palette => palette.id === paletteId ? { ...palette, name } : palette));
    };

    const updateColor = (paletteId, colorId, value) => {
        setPalettes(palettes.map(palette => {
            if (palette.id === paletteId) {
                return {
                    ...palette,
                    colors: palette.colors.map(color => color.id === colorId ? { ...color, color: value } : color)
                };
            }
            return palette;
        }));
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
                <Card key={palette.id} className="color-palette-card">
                    <CardHeader
                        onClick={() => togglePaletteOpen(palette.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <TextControl
                            label={__('Palette Name', 'custom-admin-color-options')}
                            value={palette.name}
                            onChange={(value) => updatePaletteName(palette.id, value)}
                            placeholder={__('Enter palette name...', 'custom-admin-color-options')}
                        />
                    </CardHeader>
                    {palette.isOpen && (
                        <PanelBody>
                            <div className="color-palette-container" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                {palette.colors.map((color) => (
                                    <div key={color.id} style={{ flex: '1', minWidth: '80px' }}>
                                        <ColorPalette
                                            value={color.color}
                                            onChange={(value) => updateColor(palette.id, color.id, value)}
                                            disableCustomColors={false}
                                        />
                                    </div>
                                ))}
                            </div>
                            <PanelRow>
                                <IconButton
                                    icon="trash"
                                    label={__('Remove Palette', 'custom-admin-color-options')}
                                    onClick={() => removePalette(palette.id)}
                                    className="remove-palette-btn"
                                />
                            </PanelRow>
                        </PanelBody>
                    )}
                </Card>
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
