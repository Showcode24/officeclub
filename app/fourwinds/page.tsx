import { redirect } from "next/navigation";

export default function OpenPDF() {
  redirect("/files/lost-in-london.pdf");
}
