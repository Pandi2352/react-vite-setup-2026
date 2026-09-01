import React, { useState, useRef } from 'react';
import { UploadCloud, File, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IconButton } from './icon-button';

export interface FileUploadProps {
  label?: string;
  accept?: string;
  maxSizeMB?: number;
  multiple?: boolean;
  onFilesSelected?: (files: File[]) => void;
  error?: string;
  helperText?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label = 'Upload Files',
  accept = 'image/*,application/pdf',
  maxSizeMB = 5,
  multiple = false,
  onFilesSelected,
  error,
  helperText,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setFileError(null);
    const validFiles: File[] = [];

    Array.from(files).forEach((file) => {
      if (file.size > maxSizeMB * 1024 * 1024) {
        setFileError(`File "${file.name}" exceeds maximum allowed size of ${maxSizeMB}MB.`);
        return;
      }
      validFiles.push(file);
    });

    if (validFiles.length > 0) {
      const updated = multiple ? [...selectedFiles, ...validFiles] : [validFiles[0]];
      setSelectedFiles(updated);
      if (onFilesSelected) onFilesSelected(updated);
    }
  };

  const removeFile = (index: number) => {
    const updated = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updated);
    if (onFilesSelected) onFilesSelected(updated);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="w-full space-y-2">
      {label && <label className="block text-sm font-medium text-foreground">{label}</label>}

      {/* Dropzone Container */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md cursor-pointer transition-all bg-card/50 hover:bg-accent/50 text-center',
          dragActive ? 'border-primary bg-primary/5' : 'border-border',
          (error || fileError) && 'border-destructive bg-destructive/5'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />

        <div className="p-3 rounded-full bg-primary/10 text-primary mb-3">
          <UploadCloud className="h-6 w-6" />
        </div>

        <p className="text-sm font-medium text-foreground">
          <span className="text-primary font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Supported: {accept.replace(/,/g, ', ')} (Max {maxSizeMB}MB)
        </p>
      </div>

      {/* Validation Error Message */}
      {(error || fileError) && (
        <p className="text-xs text-destructive font-medium flex items-center gap-1 mt-1">
          <AlertCircle className="h-3.5 w-3.5" />
          {error || fileError}
        </p>
      )}

      {/* Selected File Previews */}
      {selectedFiles.length > 0 && (
        <div className="space-y-2 pt-2">
          {selectedFiles.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-md border border-border bg-card text-xs"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <File className="h-4 w-4 text-primary shrink-0" />
                <span className="font-medium text-foreground truncate">{file.name}</span>
                <span className="text-muted-foreground text-[10px]">
                  ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <IconButton
                  icon={<X className="h-3.5 w-3.5" />}
                  aria-label={`Remove file ${file.name}`}
                  tooltip="Remove file"
                  size="xs"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(idx);
                  }}
                  className="hover:text-destructive"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {!error && !fileError && helperText && <p className="text-xs text-muted-foreground">{helperText}</p>}
    </div>
  );
};
