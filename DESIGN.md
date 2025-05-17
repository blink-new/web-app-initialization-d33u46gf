# StorFlo: One-Shot Kanban Board Project

Create a working Kanban board application with the following specifications. DO NOT STOP UNTIL YOU HAVE A FUNCTIONAL MVP WITH ALL FRONTEND COMPONENTS WORKING.

## Technology Stack
- Frontend: React + TypeScript + Tailwind CSS
- Database: Supabase (NO LOCAL DATABASE)
- State Management: React Context API
- Drag and Drop: react-beautiful-dnd

## CRITICAL INSTRUCTIONS:
1. THE ENTIRE APPLICATION MUST BE BUILT IN ONE GO
2. YOU MUST IMPLEMENT BOTH FRONTEND AND API CONNECTION
3. VERIFY THE APPLICATION RUNS BEFORE COMPLETION
4. SUPABASE IS YOUR ONLY DATABASE AND BACKEND - DO NOT CREATE A SEPARATE NODE.JS SERVER
5. DO NOT IMPLEMENT ANY MOCK DATA - CONNECT DIRECTLY TO GIBSONAI

## Project Setup
1. Create a new React TypeScript project with Vite
2. Configure Tailwind CSS
3. Add necessary dependencies:
   - react-router-dom
   - react-beautiful-dnd
   - axios
   - react-datepicker
   - react-icons

## Environment Configuration
1. Create a .env file for Supabase API keys
2. Create a .gitignore with node_modules, .env, .Supabase, dist, build
3. Create a services/api.ts file that handles all Supabase API interactions

## Supabase Integration
Use MCP to create this database schema in Supabase:
```
Create a Kanban board database with:
- Users (id, name, email, password, avatar)
- Boards (id, title, description, users[])
- SwimLanes (id, title, description, position, boardId)
- Cards (id, title, description, needByDate, priority[1-3], createdAt, updatedAt, assignedUserId, swimLaneId, position)
- CardHistory (id, cardId, timestamp, userId, oldLaneId, newLaneId)

Generate authentication endpoints for user registration and login that return JWT tokens with 24h expiration. 
Generate CRUD endpoints for all entities with proper authentication and authorization.
```

## Frontend Structure (CREATE ALL OF THESE COMPONENTS)
1. Components folder with:
   - Layout/
     - Navbar.tsx
     - ProtectedRoute.tsx
   - Auth/
     - LoginForm.tsx
     - RegisterForm.tsx
   - Board/
     - BoardsList.tsx
     - BoardItem.tsx
     - BoardDetail.tsx
   - Lane/
     - SwimLane.tsx
   - Card/
     - Card.tsx
     - CardModal.tsx (for create/edit)
   - UI/
     - Button.tsx
     - Input.tsx
     - Dropdown.tsx
     - DatePicker.tsx

2. Context/
   - AuthContext.tsx (handle JWT storage/usage)
   - BoardContext.tsx (manage board state)

3. Hooks/
   - useAuth.tsx
   - useBoards.tsx
   - useCards.tsx

4. Pages/
   - Home.tsx
   - Login.tsx
   - Register.tsx
   - Boards.tsx
   - BoardDetail.tsx

## Implementation Order (FOLLOW PRECISELY)
1. Set up project & install dependencies
2. Configure Supabase integration via MCP
3. Create API service to connect with Supabase
4. Implement authentication context and components
5. Create all UI components
6. Implement board listing and creation
7. Implement swim lanes and card components
8. Add drag-and-drop functionality
9. Implement card creation/editing modal
10. Add filtering and search functionality
11. Test the application end-to-end
12. START THE DEV SERVER AND VERIFY FUNCTIONALITY

## Testing Requirements
- Verify login/registration works before proceeding
- Test board creation and viewing
- Test card creation and editing
- Test drag-and-drop between lanes
- Confirm API calls are working with Supabase

DO NOT SKIP ANY COMPONENTS. IMPLEMENT EVERY SINGLE PART MENTIONED ABOVE. RUN THE APPLICATION TO VERIFY IT WORKS BEFORE DECLARING COMPLETION.
