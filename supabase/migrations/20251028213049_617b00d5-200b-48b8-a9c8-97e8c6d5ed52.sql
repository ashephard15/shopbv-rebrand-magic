-- Add bootstrap policy to allow first admin user creation
-- This policy allows any authenticated user to make themselves admin
-- BUT ONLY if no admin exists yet
CREATE POLICY "Bootstrap first admin"
ON public.user_roles FOR INSERT
WITH CHECK (
  auth.uid() = user_id 
  AND role = 'admin'
  AND NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin')
);