"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Mail, Lock, Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const result = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});

			if (result?.error) {
				// Parse error message from API response
				setError(
					result.error === "CredentialsSignin"
						? "Имэйл эсвэл нууц үг буруу, эсвэл таны бүртгэл баталгаажуулалт хүлээж байна."
						: result.error,
				);
			} else {
				// Redirect to external admin dashboard (mocked for now)
				// In production, this would redirect to the actual admin URL
				router.push("/"); // For now, just go back to landing
				router.refresh();
			}
		} catch {
			setError("Алдаа гарлаа. Дахин оролдоно уу.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full max-w-md">
			<Card className="border-border/50 shadow-lg">
				<CardHeader className="space-y-1 text-center">
					<CardTitle className="text-2xl font-bold">
						Тавтай морил
					</CardTitle>
					<CardDescription>
						Live Market бүртгэлдээ нэвтрэх
					</CardDescription>
				</CardHeader>

				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-4">
						{error && (
							<div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
								<AlertCircle className="h-4 w-4 flex-shrink-0" />
								<p>{error}</p>
							</div>
						)}

						<div className="space-y-2">
							<Label htmlFor="email">Имэйл</Label>
							<div className="relative">
								<Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
								<Input
									id="email"
									type="email"
									placeholder="you@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="pl-10"
									required
									disabled={loading}
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">Нууц үг</Label>
							<div className="relative">
								<Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
								<Input
									id="password"
									type="password"
									placeholder="••••••••"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									className="pl-10"
									required
									disabled={loading}
								/>
							</div>
						</div>
					</CardContent>

					<CardFooter className="flex flex-col gap-4">
						<Button
							type="submit"
							className="w-full gradient-bg hover:opacity-90 text-white mt-4"
							disabled={loading}>
							{loading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Нэвтэрч байна...
								</>
							) : (
								"Нэвтрэх"
							)}
						</Button>

						<p className="text-center text-sm text-muted-foreground">
							Бүртгэлгүй юу?{" "}
							<Link
								href="/signup"
								className="font-medium text-primary hover:underline">
								Бүртгүүлэх
							</Link>
						</p>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
