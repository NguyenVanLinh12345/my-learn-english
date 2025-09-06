import StartedAnnotating from "./StartedAnnotating";

export default function Introduce() {
   
    return (
        <div>
            {/* Giới thiệu về tính năng chính + ô input link youtube */}
            <StartedAnnotating />
            
            {/* Giới thiệu về cách thêm từng point để ghi nhớ */}
            <div className='pt-32'>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                    <div className="h-32 rounded bg-gray-300"></div>
                    <div className="h-32 rounded bg-gray-300 lg:col-span-2"></div>
                </div>
            </div>

            {/* Trích xuất phụ đề video */}
            <div className='pt-32'>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                    <div className="h-32 rounded bg-gray-300 lg:col-span-2"></div>
                    <div className="h-32 rounded bg-gray-300"></div>
                </div>
            </div>

            {/* Giới thiệu AI hỗ trợ ghi nhớ từ vựng */}
            <div className='pt-32'>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                    <div className="h-32 rounded bg-gray-300"></div>
                    <div className="h-32 rounded bg-gray-300 lg:col-span-2"></div>
                </div>
            </div>

            {/* Danh sách những từ khóa đã lưu - nhớ thêm tính năng tìm kiếm nha*/}
            <div className='pt-32'>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                    <div className="h-32 rounded bg-gray-300 lg:col-span-2"></div>
                    <div className="h-32 rounded bg-gray-300"></div>
                </div>
            </div>

        </div>
    )
}
