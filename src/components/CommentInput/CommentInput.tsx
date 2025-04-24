"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CommentInput = ({ tweetId, onCommentSubmit }) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value.trim() === "") return;
    onCommentSubmit(tweetId, value);
    setValue("");
  };

  return (
    <div className="ml-8 mt-4 border-l-2 border-gray-300 pl-4">
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Escribe un comentario..."
        className="mb-2 bg-gray-100 text-black"
      />
      <Button
        size="sm"
        onPress={handleSubmit}
        className="bg-blue-500 text-white hover:bg-blue-600"
      >
        Comentar
      </Button>
    </div>
  );
};

export default CommentInput;