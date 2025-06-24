import { Button, Form, Input } from "antd"
// import { NavLink } from "react-router";
function Login () {
    const handleLogin = () => {
        // Handle login logic here
        console.log("Login button clicked");
        // Redirect to home page after login
    }
type FormField = {
    username: string;
    password: string;
}
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1>Login</h1>
            <Form>
                <Form.Item<FormField>
                    label="Username"
                    name="username">
                    <Input type="text" placeholder="Enter your username" />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={handleLogin}>Login</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default Login