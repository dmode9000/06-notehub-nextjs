"use client";

type Props = {
  error: Error | null;
};

const fetchIdError = ({ error }: Props) => {
  return <p>Could not fetch note {error?.message || "Unknown error"}</p>;
};

export default fetchIdError;
