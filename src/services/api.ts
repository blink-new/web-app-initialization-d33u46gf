// src/services/api.ts
import { supabase } from '../lib/supabaseClient';
import { AuthError, User } from '@supabase/supabase-js';
import { SignUpWithPasswordCredentials, SignInWithPasswordCredentials } from '@supabase/supabase-js';

// Example types (you'll define these more thoroughly based on your schema)
export interface Board {
  id?: string;
  title: string;
  description?: string;
  owner_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SwimLane {
  id?: string;
  title: string;
  description?: string;
  position: number;
  board_id: string;
  created_at?: string;
  updated_at?: string;
}

export interface Card {
  id?: string;
  title: string;
  description?: string;
  need_by_date?: string | null;
  priority?: number | null;
  assigned_user_id?: string | null;
  swim_lane_id: string;
  position: number;
  created_at?: string;
  updated_at?: string;
}

// --- Authentication --- (Matches Supabase Auth methods)
export const signUp = async (credentials: SignUpWithPasswordCredentials): Promise<{ user: User | null; error: AuthError | null }> => {
  const { data, error } = await supabase.auth.signUp(credentials);
  return { user: data.user, error };
};

export const signIn = async (credentials: SignInWithPasswordCredentials): Promise<{ user: User | null; error: AuthError | null }> => {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);
  return { user: data.user, error };
};

export const signOut = async (): Promise<{ error: AuthError | null }> => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }
  return null;
};

export const onAuthStateChange = (callback: (event: string, session: import('@supabase/supabase-js').Session | null) => void) => {
  return supabase.auth.onAuthStateChanged(callback);
};

// --- Users (public.users table) ---
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

export const updateUserProfile = async (userId: string, updates: Partial<User>) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  return { data, error };
};


// --- Boards --- (Placeholder - to be expanded)
export const getBoards = async (): Promise<{ data: Board[] | null; error: any }> => {
  const { data, error } = await supabase.from('boards').select('*, owner:owner_id(id, name, email, avatar), members:board_members(role, user:user_id(id, name, email, avatar))');
  return { data, error };
};

export const getBoardById = async (boardId: string): Promise<{ data: Board | null; error: any }> => {
  const { data, error } = await supabase
    .from('boards')
    .select('*, owner:owner_id(id, name, email, avatar), members:board_members(role, user:user_id(id, name, email, avatar)), swim_lanes(*, cards(*, assigned_user:assigned_user_id(id, name, email, avatar)))')
    .eq('id', boardId)
    .order('position', { foreignTable: 'swim_lanes', ascending: true })
    .order('position', { foreignTable: 'swim_lanes.cards', ascending: true })
    .single();
  return { data, error };
};

export const createBoard = async (boardData: Omit<Board, 'id' | 'created_at' | 'updated_at' | 'owner_id'>): Promise<{ data: Board | null; error: any }> => {
  const user = await getCurrentUser();
  if (!user) return { data: null, error: { message: 'User not authenticated' } };
  const { data, error } = await supabase.from('boards').insert([{ ...boardData, owner_id: user.id }]).select().single();
  return { data, error };
};

export const updateBoard = async (boardId: string, updates: Partial<Board>): Promise<{ data: Board | null; error: any }> => {
  const { data, error } = await supabase.from('boards').update(updates).eq('id', boardId).select().single();
  return { data, error };
};

export const deleteBoard = async (boardId: string): Promise<{ error: any }> => {
  const { error } = await supabase.from('boards').delete().eq('id', boardId);
  return { error };
};

// --- Swim Lanes --- (Placeholder - to be expanded)
export const getSwimLanesForBoard = async (boardId: string): Promise<{ data: SwimLane[] | null; error: any }> => {
  const { data, error } = await supabase.from('swim_lanes').select('*').eq('board_id', boardId).order('position', { ascending: true });
  return { data, error };
};

export const createSwimLane = async (swimLaneData: Omit<SwimLane, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: SwimLane | null; error: any }> => {
  const { data, error } = await supabase.from('swim_lanes').insert([swimLaneData]).select().single();
  return { data, error };
};

export const updateSwimLane = async (swimLaneId: string, updates: Partial<SwimLane>): Promise<{ data: SwimLane | null; error: any }> => {
  const { data, error } = await supabase.from('swim_lanes').update(updates).eq('id', swimLaneId).select().single();
  return { data, error };
};

export const deleteSwimLane = async (swimLaneId: string): Promise<{ error: any }> => {
  const { error } = await supabase.from('swim_lanes').delete().eq('id', swimLaneId);
  return { error };
};

// --- Cards --- (Placeholder - to be expanded)
export const getCardsForSwimLane = async (swimLaneId: string): Promise<{ data: Card[] | null; error: any }> => {
  const { data, error } = await supabase.from('cards').select('*, assigned_user:assigned_user_id(id, name, email, avatar)').eq('swim_lane_id', swimLaneId).order('position', { ascending: true });
  return { data, error };
};

export const createCard = async (cardData: Omit<Card, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: Card | null; error: any }> => {
  const { data, error } = await supabase.from('cards').insert([cardData]).select('*, assigned_user:assigned_user_id(id, name, email, avatar)').single();
  return { data, error };
};

export const updateCard = async (cardId: string, updates: Partial<Card>): Promise<{ data: Card | null; error: any }> => {
  const { data, error } = await supabase.from('cards').update(updates).eq('id', cardId).select('*, assigned_user:assigned_user_id(id, name, email, avatar)').single();
  return { data, error };
};

export const deleteCard = async (cardId: string): Promise<{ error: any }> => {
  const { error } = await supabase.from('cards').delete().eq('id', cardId);
  return { error };
};

// --- Board Members ---
export const addBoardMember = async (boardId: string, userId: string, role: string = 'member') => {
    const { data, error } = await supabase
        .from('board_members')
        .insert([{ board_id: boardId, user_id: userId, role: role }])
        .select();
    return { data, error };
};

export const removeBoardMember = async (boardId: string, userId: string) => {
    const { error } = await supabase
        .from('board_members')
        .delete()
        .eq('board_id', boardId)
        .eq('user_id', userId);
    return { error };
};

export const updateBoardMemberRole = async (boardId: string, userId: string, role: string) => {
    const { data, error } = await supabase
        .from('board_members')
        .update({ role })
        .eq('board_id', boardId)
        .eq('user_id', userId)
        .select();
    return { data, error };
};

// --- Card History ---
export const getCardHistory = async (cardId: string) => {
    const { data, error } = await supabase
        .from('card_history')
        .select('*, user:user_id(id, name, email, avatar)')
        .eq('card_id', cardId)
        .order('timestamp', { ascending: false });
    return { data, error };
};


// Function to update positions of multiple items (cards or swimlanes)
// items: array of { id: string, position: number }
// tableName: 'cards' or 'swim_lanes'
export const updateItemPositions = async (items: {id: string, position: number}[], tableName: 'cards' | 'swim_lanes') => {
  if (!items || items.length === 0) {
    return { data: [], error: null };
  }

  // Supabase doesn't directly support bulk upsert with different values per row in the same way as some SQL databases via a single command.
  // We need to perform individual updates or use a stored procedure for more complex bulk operations.
  // For simplicity and RLS to work correctly, individual updates are safer here.
  
  const results = [];
  let overallError = null;

  for (const item of items) {
    const { data, error } = await supabase
      .from(tableName)
      .update({ position: item.position })
      .eq('id', item.id)
      .select('id, position'); // select only what's needed
    
    if (error) {
      console.error(`Error updating ${tableName} ${item.id} position:`, error);
      overallError = error; // Capture the first error encountered
      // Decide if you want to stop on first error or continue
      // break; 
    }
    if (data) {
      results.push(data);
    }
  }

  if (overallError) {
    return { data: null, error: overallError };
  }
  return { data: results.flat(), error: null };
};
