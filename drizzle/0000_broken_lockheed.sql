CREATE TABLE "santri2" (
	"id" serial PRIMARY KEY NOT NULL,
	"nama" varchar(256) NOT NULL,
	"kelas" varchar(50),
	"created_at" timestamp DEFAULT now()
);
