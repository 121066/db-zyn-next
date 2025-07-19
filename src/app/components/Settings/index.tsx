import { Select, Switch, Form } from 'antd'
import { useState } from 'react'

const Settings = () => {
    const [settings, setSettings] = useState({
        theme: 'auto',
        language: 'en-US',
        panelLayout: 'auto',
        enableShortcuts: true,
        showUpdates: true,
        detectIndentation: true,
        autocompletion: true,
    })

    return (
        <div className="settings-panel p-6 bg-white rounded shadow-lg">
            <h2 className="text-lg font-medium mb-4">Settings</h2>
            <Form layout="vertical">
                <Form.Item label="Theme">
                    <Select
                        value={settings.theme}
                        onChange={(value) => setSettings({...settings, theme: value})}
                        options={[
                            { label: 'Auto', value: 'auto' },
                            { label: 'Light', value: 'light' },
                            { label: 'Dark', value: 'dark' },
                        ]}
                    />
                </Form.Item>
                
                <Form.Item label="Panel Layout">
                    <Select
                        value={settings.panelLayout}
                        onChange={(value) => setSettings({...settings, panelLayout: value})}
                        options={[
                            { label: 'Auto', value: 'auto' },
                            { label: 'Horizontal', value: 'horizontal' },
                            { label: 'Vertical', value: 'vertical' },
                        ]}
                    />
                </Form.Item>

                <Form.Item>
                    <Switch 
                        checked={settings.detectIndentation}
                        onChange={(checked) => setSettings({...settings, detectIndentation: checked})}
                    /> Detect Indentation
                </Form.Item>

                <Form.Item>
                    <Switch 
                        checked={settings.autocompletion}
                        onChange={(checked) => setSettings({...settings, autocompletion: checked})}
                    /> Autocompletion
                </Form.Item>
            </Form>
        </div>
    )
}

export default Settings 