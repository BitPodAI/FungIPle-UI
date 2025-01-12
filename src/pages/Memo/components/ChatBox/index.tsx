import React from 'react';

const ChatBox: React.FC = () => {
  return (
    <div className="p-4 border-b border-gray-200">
      <textarea className="w-full p-2 border border-gray-300 rounded resize-none" rows={2} placeholder="CHAT WITH ME..."></textarea>
      <div className="flex items-center justify-between mt-2">
        <div className="text-sm space-x-2">
          <button className="font-bold">B</button>
          <button className="italic">U</button>
          <button className="underline">I</button>
        </div>
        <button className="px-3 py-1 bg-blue-500 text-white rounded">Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
