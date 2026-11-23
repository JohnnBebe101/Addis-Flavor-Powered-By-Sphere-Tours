import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function PlanYourVisitRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/#plan-your-visit', { replace: true });
  }, [navigate]);
  return null;
}
