import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
	// Agreement documents (no auth required - public upload)
	agreementDocument: f({
		image: { maxFileSize: "4MB", maxFileCount: 3 },
		pdf: { maxFileSize: "8MB", maxFileCount: 3 },
	}).onUploadComplete(async ({ file }) => {
		console.log("Agreement document uploaded:", file.url);
		return { url: file.url };
	}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
