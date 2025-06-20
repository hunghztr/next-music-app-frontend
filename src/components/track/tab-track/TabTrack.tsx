
import {FileWithPath, useDropzone} from 'react-dropzone';
import {useCallback, useState} from "react";
import {useSession} from "next-auth/react";
import axios, { AxiosProgressEvent} from "axios";
import AlertInfo from "@/components/alert/AlertInfo";


const TabTrack = ({setTrackUpload,trackUpload,setValue}:
                  {setTrackUpload:any;trackUpload:any;setValue:any}) => {
    // mở toast báo lỗi
    const [openMessage, setOpenMessage] = useState<boolean>(false);
    const [resMessage, setResMessage] = useState<string>("");

    const {data: session} = useSession();
    const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
        if (acceptedFiles && acceptedFiles[0]) {
            setValue(1)
            const audio = acceptedFiles[0];
            const formData = new FormData();
            formData.append('fileUpload', audio)


                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/files/upload-mp3`,
                    formData, {
                        headers: {'Authorization': `Bearer ${session?.accessToken}`},
                        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                            const percentCompleted = Math.round(
                                (progressEvent.loaded * 100) / (progressEvent.total!)
                            );

                            setTrackUpload({...trackUpload,
                                fileName:acceptedFiles[0].name,progress:percentCompleted})

                        },
                    }
                )
                setTrackUpload((prev : any) =>({...prev,uploadedFileName:res.data.data.result}))
                if(res.status >= 400) {
                    setResMessage("có lỗi xảy ra, vui lòng đăng nhập lại")
                }


        }
    }, [session])
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: {
            'audio': ['.mp3','m4a']
        }
    });

    const files = acceptedFiles.map((file: FileWithPath) => (
        <li key={file.path} className="text-sm text-gray-700">
            {file.path} - {(file.size / 1024).toFixed(2)} KB
        </li>
    ));

    return (
        <section className="max-w-xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
            <div
                {...getRootProps({
                    className:
                        'flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-10 cursor-pointer hover:border-blue-400 transition duration-200',
                })}
            >
                <input {...getInputProps()} />
                <p className="text-gray-600 text-center">
                    <span className="font-medium text-blue-600">Drag & drop</span> some files here,
                    or click to select files
                </p>
            </div>

            {acceptedFiles.length > 0 && (
                <aside className="mt-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Selected Files</h4>
                    <ul className="list-disc list-inside space-y-1">{files}</ul>
                </aside>
            )}
            <AlertInfo openMessage={openMessage} setOpenMessage={setOpenMessage} resMessage={resMessage} />
        </section>
    );
};

export default TabTrack;
