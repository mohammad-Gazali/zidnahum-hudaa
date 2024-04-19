import { useState } from "react";
import { FilledButton, TextField } from "../ui";
import { useMutation } from "@tanstack/react-query";
import { auth } from "../lib/http";

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

  const { mutate } = useMutation({
    mutationFn: async () => { await auth({ username, password }) },
    onError: (err) => {
      alert(err.message);
    },
  });

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col items-center pb-20 flex-1 justify-center gap-6 max-w-md mx-auto"
		>
			<TextField
				value={username}
				onInput={(e) => {
					setUsername(e.currentTarget.value);
				}}
				label="اسم المستخدم"
				required
			/>
			<TextField
				value={password}
				onInput={(e) => setPassword(e.currentTarget.value)}
				label="كلمة المرور"
				type="password"
				required
			/>
			<FilledButton className="w-fit">تسجيل الدخول</FilledButton>
		</form>
	);
};

export default LoginPage;
