type FilePickerType = {
    description: string,
    accept: Object<string, string | Array>
}

type FilePickerOptions = {
    types: Array<FilePickerType>
}

interface Window {
    showSaveFilePicker?: (opts : FilePickerOptions) => unknown
    chooseFileSystemEntries: (opts: FilePickerOptions) => unknown
}
