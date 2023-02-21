import ColumnHeightOutlined from '@ant-design/icons/lib/icons/ColumnHeightOutlined'
import ColumnWidthOutlined from '@ant-design/icons/lib/icons/ColumnWidthOutlined'
import { Form, Input, Checkbox, Button } from 'antd'
import { useEffect, useState } from 'react'
import { IProject } from './IProject'

interface Props {
    project?: IProject
}

export const ProjectSettingsForm = (props: Props) => {
    const [initialValues, setInitialValues] = useState<{ projectName: string }>({ projectName: '' });
    const [projectName, setProjectName] = useState('');

    const handleSetIntialValues = () => {
        setInitialValues({ projectName: props.project?.name })
    }

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setProjectName(e.currentTarget.value)
    }

    const handleFormSubmit = (values: any) => {
        console.log(values)
    }

    useEffect(() => {
        handleSetIntialValues();

    }, [props.project]);

    return (
        <Form
            onFinish={handleFormSubmit}
            size='small'
            name="normal_login"
            className="login-form"
            initialValues={initialValues}
        >
            <Form.Item
                name="projectName"
            >
                <Input prefix={<ColumnWidthOutlined />} placeholder="Ad" onInput={handleInputChange} value={projectName} />
            </Form.Item>

            <Form.Item>
                <Button onClick={handleSetIntialValues} type="primary" block htmlType="submit" className="login-form-button">
                    Kaydet
                </Button>
            </Form.Item>
        </Form>
    )
}
