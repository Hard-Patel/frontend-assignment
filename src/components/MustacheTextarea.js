import { useRef, useEffect } from "react";

function highlightMustache(text) {
  return text.replace(
    /\{\{(.*?)\}\}/g,
    `<span class="bg-yellow-200 text-yellow-900 rounded px-1">$&</span>`
  );
}

function getCaretPosition(el) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return 0;

  const range = selection.getRangeAt(0);
  const preRange = range.cloneRange();

  preRange.selectNodeContents(el);
  preRange.setEnd(range.endContainer, range.endOffset);

  return preRange.toString().length;
}

function setCaretPosition(el, position) {
  const range = document.createRange();
  const selection = window.getSelection();

  let current = 0;
  const walker = document.createTreeWalker(
    el,
    NodeFilter.SHOW_TEXT,
    null
  );

  let node = null;

  while ((node = walker.nextNode())) {
    const next = current + node.length;
    if (position <= next) {
      range.setStart(node, position - current);
      range.collapse(true);
      break;
    }
    current = next;
  }

  selection?.removeAllRanges();
  selection?.addRange(range);
}

function normalizeMustache(text) {
  return text.replace(/\{\{(.*?)\}\}/g, (_, content) => {
    const sanitized = content.replace(/[^a-zA-Z0-9._-]/g, "_");
    return `{{${sanitized}}}`;
  });
}

function autoResize(el) {
  el.style.height = "auto";
  el.style.height = el.scrollHeight + "px";
}

export function MustacheTextarea({ value = "", onChange, className = "" }) {
  const ref = useRef(null);

  const handleInput = () => {
    if (!ref.current) return;
    const el = ref.current;

    const caret = getCaretPosition(el);

    let text = el.innerText || el.textContent || "";

    text = normalizeMustache(text);

    el.innerHTML = highlightMustache(text);

    autoResize(el);
    setCaretPosition(el, caret);

    if (onChange) {
      onChange(text);
    }
  };

  useEffect(() => {
    if (ref.current && value !== undefined) {
      const currentText = ref.current.innerText || ref.current.textContent || "";
      if (value !== currentText) {
        const caret = getCaretPosition(ref.current);
        ref.current.innerText = value;
        ref.current.innerHTML = highlightMustache(value);
        autoResize(ref.current);
        setCaretPosition(ref.current, Math.min(caret, value.length));
      }
    }
  }, [value]);

  useEffect(() => {
    if (ref.current) {
      const initialValue = value || "";
      ref.current.innerText = initialValue;
      ref.current.innerHTML = highlightMustache(initialValue);
      autoResize(ref.current);
    }
  }, []);

  return (
    <div
      ref={ref}
      contentEditable
      onInput={handleInput}
      spellCheck={false}
      className={`nodrag min-w-40 min-h-[40px] border border-gray-300 rounded px-3 py-2 outline-none whitespace-pre-wrap break-words ${className}`}
      role="textbox"
      aria-multiline="true"
    />
  );
}

