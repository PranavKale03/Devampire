import LeftSidebar from "../../components/LeftSidebar";
import RightSidebar from "../../components/RightSidebar";
import HomeMainbar from "../../components/HomeMainbar";

export default function Questions() {
    return (
        <div className="flex justify-center w-full min-h-screen bg-white max-w-[1250px] mx-auto">
            <LeftSidebar />
            <div className="flex flex-col w-full max-w-[1100px] p-6 box-border">
                <div className="flex w-full">
                    <HomeMainbar />
                    <RightSidebar />
                </div>
            </div>
        </div>
    );
}
