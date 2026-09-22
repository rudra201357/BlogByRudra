
import { Editor } from '@tinymce/tinymce-react';
import tinymce from 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/models/dom';
import 'tinymce/themes/silver';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/help';
import 'tinymce/plugins/image';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/media';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/table';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/wordcount';
import 'tinymce/skins/ui/oxide/skin.css';
import { Controller } from 'react-hook-form';

export default function RTE({name, control, label, defaultValue =""}) {
  return (
    <div className='min-w-0 w-full'> 
    {label && <label className='mb-1 inline-block pl-1'>{label}</label>}

    <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange}}) => (
        <Editor
        tinymce={tinymce}
        initialValue={defaultValue}
        init={{
          license_key: "gpl",
            initialValue: defaultValue,
          width: "100%",
            height: 500,
            menubar: true,
          toolbar_mode: "sliding",
          resize: false,
            plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
            ],
               toolbar: 'undo redo | blocks | bold italic underline strikethrough | link image media table | align | checklist numlist bullist indent outdent | emoticons charmap | removeformat | code fullscreen',
            mobile: {
              menubar: false,
              toolbar_mode: "sliding",
              toolbar: "undo redo | blocks | bold italic underline | link image | bullist numlist | removeformat",
            },
        
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        />
    )}
    />

     </div>
  )
}