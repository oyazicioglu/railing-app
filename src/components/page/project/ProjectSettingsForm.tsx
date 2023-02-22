import FieldStringOutlined from '@ant-design/icons/lib/icons/FieldStringOutlined'
import { Form, Input, Checkbox, Button } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { IProject } from './IProject'

interface Props {
    project?: IProject
}

export const ProjectSettingsForm = (props: Props) => {
    const [project, setProject] = useState<IProject>()
    const [form] = Form.useForm();

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    }

    const handleFormSubmit = (values: any) => {
        console.log(values)
    }

    useEffect(() => {
        setProject(props.project)
        if (props.project) {
            form.resetFields();
            form.setFieldsValue({
                'projectName': props.project.name
            });
        }
    }, [props.project]);

    return (
        <Form
            form={form}
            onFinish={handleFormSubmit}
            size='small'
            name="normal_login"
            className="login-form"
        >
            <Form.Item name="projectName">
                <Input prefix={<FieldStringOutlined />} placeholder="Ad" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" block htmlType="submit" className="login-form-button">
                    Kaydet
                </Button>
            </Form.Item>
        </Form>
    )
}
