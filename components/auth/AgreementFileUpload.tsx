"use client";

import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@uploadthing/react";
import { FileText, Image as ImageIcon, X } from "lucide-react";
import { useState } from "react";

interface AgreementFileUploadProps {
	onFilesChange: (urls: string[]) => void;
	disabled?: boolean;
}

interface UploadedFile {
	url: string;
	name: string;
	type: string;
}

export function AgreementFileUpload({
	onFilesChange,
	disabled = false,
}: AgreementFileUploadProps) {
	const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
	const [error, setError] = useState<string>("");

	const handleUploadComplete = (files: { url: string; name: string }[]) => {
		const newFiles = files.map((file) => ({
			url: file.url,
			name: file.name,
			type: file.name.toLowerCase().endsWith(".pdf") ? "pdf" : "image",
		}));

		const updatedFiles = [...uploadedFiles, ...newFiles];
		setUploadedFiles(updatedFiles);
		onFilesChange(updatedFiles.map((f) => f.url));
		setError("");
	};

	const handleRemoveFile = (urlToRemove: string) => {
		const updatedFiles = uploadedFiles.filter((f) => f.url !== urlToRemove);
		setUploadedFiles(updatedFiles);
		onFilesChange(updatedFiles.map((f) => f.url));

		if (updatedFiles.length === 0) {
			setError("At least one agreement document is required");
		}
	};

	const getFileName = (url: string) => {
		const file = uploadedFiles.find((f) => f.url === url);
		return file?.name || url.split("/").pop() || "Unknown file";
	};

	const getFileType = (url: string) => {
		const file = uploadedFiles.find((f) => f.url === url);
		return file?.type || "unknown";
	};

	return (
		<div className="space-y-4">
			<div className="rounded-lg border border-dashed border-border p-6">
				<div className="flex flex-col items-center gap-4">
					<div className="rounded-full bg-primary/10 p-3">
						<FileText className="h-6 w-6 text-primary" />
					</div>

					<div className="text-center">
						<h3 className="font-medium">
							Upload Agreement Documents
						</h3>
						<p className="mt-1 text-sm text-muted-foreground">
							Upload scanned copies or photos of signed agreement
							documents
						</p>
						<p className="mt-1 text-xs text-muted-foreground">
							Supported: Images (max 4MB) and PDFs (max 8MB) •
							Maximum 3 files
						</p>
					</div>

					<UploadButton<OurFileRouter, "agreementDocument">
						endpoint="agreementDocument"
						onClientUploadComplete={(res) => {
							if (res) {
								handleUploadComplete(
									res.map((file) => ({
										url: file.url,
										name: file.name,
									})),
								);
							}
						}}
						onUploadError={(error: Error) => {
							setError(`Upload failed: ${error.message}`);
						}}
						disabled={disabled || uploadedFiles.length >= 3}
						appearance={{
							button: "ut-ready:bg-primary ut-uploading:cursor-not-allowed ut-uploading:bg-primary/50 bg-primary text-primary-foreground hover:bg-primary/90 ut-button:w-full",
							allowedContent: "hidden",
						}}
					/>
				</div>
			</div>

			{/* Error Display */}
			{error && (
				<div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
					{error}
				</div>
			)}

			{/* Uploaded Files List */}
			{uploadedFiles.length > 0 && (
				<div className="space-y-2">
					<h4 className="text-sm font-medium">
						Uploaded Files ({uploadedFiles.length}/3)
					</h4>
					<div className="space-y-2">
						{uploadedFiles.map((file) => (
							<div
								key={file.url}
								className="flex items-center justify-between rounded-lg border border-border bg-muted/50 p-3">
								<div className="flex items-center gap-3 flex-1 min-w-0">
									{file.type === "pdf" ? (
										<FileText className="h-5 w-5 flex-shrink-0 text-red-500" />
									) : (
										<ImageIcon className="h-5 w-5 flex-shrink-0 text-blue-500" />
									)}
									<div className="min-w-0 flex-1">
										<p className="truncate text-sm font-medium">
											{file.name}
										</p>
										<a
											href={file.url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-xs text-primary hover:underline">
											View file
										</a>
									</div>
								</div>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onClick={() => handleRemoveFile(file.url)}
									disabled={disabled}
									className="flex-shrink-0">
									<X className="h-4 w-4" />
								</Button>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Validation Message */}
			{uploadedFiles.length === 0 && (
				<p className="text-sm text-muted-foreground">
					⚠️ At least one agreement document is required to complete
					registration
				</p>
			)}
		</div>
	);
}
