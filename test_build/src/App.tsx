import { useEffect, useMemo, useState } from "react";
import RichTextEditor from "rich-text-editor-for-react";
import useRichTextEditor from "rich-text-editor-for-react/hook";

const App = () => {
  const [show, setShow] = useState<any>();
  const { output, fetchOutput } = useRichTextEditor();
  const database: Array<string> = [
    "Peter",
    "Ahmed",
    "Habbib",
    "Esther",
    "John",
  ];
  const [text, setText] = useState("");
  const [state, setState] = useState<Array<string>>([]);

  // const filterSearch = useMemo(() => {
  //   return setState(database.filter((el) => el.includes(text));)
  // }, [database, text]);

  const filterSearch = useMemo(() => {
    return database.filter((el) => el.includes(text));
  }, [database, text]);

  useEffect(() => {}, [text]);

  return (
    <div>
      <input
        className="border rounded-sm mt-8"
        value={text}
        onChange={(e: any) => {
          setText(e.target.value);
        }}
      />{" "}
      <button
        className="py-1 px-4 bg-purple-500 text-white rounded-sm"
        onClick={() => {
          setState(database.filter((el) => el.includes(text)));
          localStorage.setItem("dataText", JSON.stringify(output));

          setShow(JSON.parse(localStorage.getItem("dataText")!));
        }}
      >
        {" "}
        search
      </button>
      <div>
        {filterSearch.map((props) => (
          <p key={props}>{props}</p>
        ))}
      </div>
      <div className="bg-purple-500 mt-8 min-h-[100px] ">
        <RichTextEditor
          toolbarOptions={[
            "word_count",
            "clear_format",
            "undo",
            "redo",
            "font",
            "header",
            "bold",
            "italic",
            "underline",

            "strikethrough",
            "text_color",
            "highlight_color",
            "numbered_list",
            "bulleted_list",
            "align",
            "decrease_indent",
            "increase_indent",
            "direction",
            "blockquote",
            "code_block",
            "link",
            "image_base64",
            "embed_video",
            "format_media",
            "sub_script",
            "super_script",
          ]}
          customizeUI={{
            backgroundColor: "#fcfcfc",
            primaryColor: "#20464b",
          }}
          fetchOutput={fetchOutput}
        />
      </div>
      <div dangerouslySetInnerHTML={{ __html: show }} />
      <div>End</div>
      <div>{show}</div>
    </div>
  );
};

export default App;
