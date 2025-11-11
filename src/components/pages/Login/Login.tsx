import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { login } from "@/services/auth.service";
import { setLocalStorage } from "@/utils/storage";
import { useNavigate } from "react-router-dom";
import { type LoginForm, loginSchema } from "@/validations/auth-validation";
import { INITIAL_LOGIN_FORM } from "@/constants/auth-constant";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: INITIAL_LOGIN_FORM,
  });

  const handleLogin = async (data: LoginForm) => {
    try {
      const result = await login(data);
      setLocalStorage("auth", result.token);
      // console.log("Login successful:", result);
      return navigate("/orders");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 gap-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="w-full max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Login to WPU Cafe
              </CardTitle>
              <CardDescription className="text-center">
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2 relative">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-5"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}>
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">
                Login
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
};

export default Login;
