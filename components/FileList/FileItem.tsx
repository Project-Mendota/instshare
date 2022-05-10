import { FileType } from 'lib/types';
import React, { FC } from 'react';

interface FileItemProps {
  type: FileType;
  progress: number;
}

const FileItem: FC<FileItemProps> = (props) => {
  return (
    <>
      <div>{props.progress}</div>
    </>
  );
};

export default FileItem;
