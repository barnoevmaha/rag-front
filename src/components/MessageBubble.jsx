import ReactMarkdown from "react-markdown";

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";
  return (
    <div className={"message-row" + (isUser ? " message-row-user" : "")}>
      <div className={"message-bubble" + (isUser ? " message-bubble-user" : "") + (message.isError ? " message-bubble-error" : "")}>
        <ReactMarkdown
          components={{
            code({ inline, className, children, ...props }) {
              return inline ? (
                <code className="inline-code" {...props}>
                  {children}
                </code>
              ) : (
                <pre className="code-block">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              );
            },
          }}
        >
          {message.text}
        </ReactMarkdown>

        {message.sources && message.sources.length > 0 && (
          <details className="message-sources">
            <summary>{message.sources.length} source chunk{message.sources.length > 1 ? "s" : ""}</summary>
            {message.sources.map((source, idx) => (
              <div key={idx} className="source-chunk">
                <span className="source-chunk-meta">
                  Chunk #{source.chunk_index} &middot; score {source.score.toFixed(3)}
                </span>
                <p>{source.text}</p>
              </div>
            ))}
          </details>
        )}
      </div>
    </div>
  );
}
