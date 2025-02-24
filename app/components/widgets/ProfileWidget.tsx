'use client';

interface ProfileProps {
  name?: string;
  id: string;
}

export default function ProfileWidget({ name = 'Unknown User', id }: ProfileProps) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="max-w-sm p-6 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border border-gray-600 rounded-lg shadow-lg text-white">
      <div className="flex flex-col items-center">
        <div
          className="flex items-center justify-center w-16 h-16 mb-4 text-xl font-extrabold bg-blue-600 rounded-full"
          aria-label={`Profile initial for ${name}`}
        >
          {initial}
        </div>

        <div className="text-center">
          <h2 className="mb-1 text-lg font-bold tracking-wider">{name}</h2>
          <p className="text-sm font-medium tracking-wide text-gray-400">{id}</p>
        </div>
      </div>
    </div>
  );
}
