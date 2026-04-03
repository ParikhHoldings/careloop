import { SignIn } from "@clerk/nextjs";
import { Heart } from "lucide-react";
export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4"><div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center"><Heart className="w-4 h-4 text-white" /></div><span className="font-bold text-gray-900 text-lg">CareLoop</span></div>
          <h1 className="text-2xl font-bold text-gray-900">Sign in</h1>
          <p className="text-gray-600 mt-2 text-sm">Your parent&apos;s care team is waiting.</p>
        </div>
        <SignIn />
      </div>
    </div>
  );
}
