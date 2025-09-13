"use client";

import * as Y from "yjs";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useState, useTransition } from "react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "./ui/select";
import { BotIcon, LanguagesIcon } from "lucide-react";
import { toast } from "sonner";
import Markdown from "react-markdown";

type Language =
  | "english"
  | "spanish"
  | "portuguese"
  | "french"
  | "german"
  | "chinese"
  | "japanese"
  | "arabic"
  | "hindi"
  | "russian"
  | "marathi";

const languages: Language[] = [
  "english",
  "spanish",
  "portuguese",
  "french",
  "german",
  "chinese",
  "japanese",
  "arabic",
  "hindi",
  "russian",
  "marathi",
];
const TranslateDocument = ({ doc }: { doc: Y.Doc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<string>("");
  const [summary, setSummary] = useState("");
  const [question, setQuestion] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const documentData = doc.get("document-store").toJSON();

      const res = await fetch(`/translateDocument`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentData,
          targetLang: language,
        }),
      });

      if (res.ok) {
        const { translated_text } = await res.json();
        setSummary(translated_text);
        toast.success("Successfully translated the document");
      } else {
        toast.error("Failed to translate the document");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>
          <LanguagesIcon />
          Translate
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Translate the Document</DialogTitle>
          <DialogDescription>
            Select a language and AI will translate a summary of the document in
            the selected language.
          </DialogDescription>
          <hr className="mt-5" />
        </DialogHeader>
        {summary && (
          <div className="flex flex-col items-start gap-2 max-h-96 overflow-y-scroll p-5 bg-gray-100">
            <div className="flex">
              <BotIcon className="w-10 flex-shrink-0" />
              <p className="font-bold">
                GPT {isPending ? "is thinking..." : "Says:"}
              </p>
            </div>
            <p>{isPending ? "Thinking..." : <Markdown>{summary}</Markdown>}</p>
          </div>
        )}
        <form className="flex gap-2" onSubmit={handleAskQuestion}>
          <Select
            value={language}
            onValueChange={(value) => setLanguage(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language} value={language}>
                  {language.charAt(0).toUpperCase() + language.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit" disabled={!language || isPending}>
            {isPending ? "Translating..." : "Translate"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default TranslateDocument;
