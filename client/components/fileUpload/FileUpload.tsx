import React, {useRef} from 'react';

interface FileUploadProps {
    setFile: Function;
    accept: string
}

const FileUpload: React.FC<FileUploadProps> = ({accept, setFile, children}) => {
    const fileRef = useRef<HTMLInputElement>()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files[0])
    }

    return (
        <div onClick={() => fileRef.current.click()}>
            <input
                type={"file"}
                accept={accept}
                ref={fileRef}
                style={{display: "none"}}
                onChange={onChange}
            />
            {children}
        </div>
    );
};

export default FileUpload;