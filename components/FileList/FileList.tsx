import { FileInfo } from 'lib/types';
import React, { FC } from 'react';

interface FileListProps {
  items: FileInfo[];
}

const FileList: FC<FileListProps> = (props) => {
  return (
    <>
      <div>
        {props.items.map((f) => (
          <div key={f.type}>{f.name}</div>
        ))}
      </div>
    </>
  );
};

export default FileList;
