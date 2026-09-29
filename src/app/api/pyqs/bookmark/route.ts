import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import { User } from '@/lib/models/User';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { pyqId } = await req.json();
    if (!pyqId) {
      return NextResponse.json({ error: 'PYQ ID is required' }, { status: 400 });
    }

    await connectDB();
    const user = await User.findById((session.user as any).id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isBookmarked = user.bookmarkedPYQs.includes(pyqId);

    if (isBookmarked) {
      // Remove bookmark
      user.bookmarkedPYQs = user.bookmarkedPYQs.filter((id: any) => id.toString() !== pyqId);
    } else {
      // Add bookmark
      user.bookmarkedPYQs.push(pyqId);
    }

    await user.save();

    return NextResponse.json({ 
      bookmarked: !isBookmarked,
      message: isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks' 
    });
  } catch (error) {
    console.error('Bookmark API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
