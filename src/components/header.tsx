interface Props {
  head: string;
  body: string;
}

export default function Header({ head, body }: Props) {
  return (
    <div className="mb-7 w-full max-w-[36rem]">
      <h1 className="text-lg font-semibold tracking-tight">{head}</h1>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {body}
      </p>
    </div>
  );
}
