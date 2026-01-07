import { MessageSquare } from "lucide-react";

const ClientNotSelected = () => {
    return (
        <div className="w-full min-h-screen flex flex-1 flex-col items-center justify-center ">
            <div className="max-w-md text-center space-y-6">

                <div className="flex justify-center gap-4 mb-4">
                    <div className="relative">
                        <div
                            className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
                            justify-center animate-bounce"
                        >
                            <MessageSquare className="w-8 h-8 text-primary " />
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold">Welcome!</h2>
                <p className="text-base-content/60">
                    Select a conversation from the sidebar.
                </p>
            </div>
        </div>
    );
};

export default ClientNotSelected;