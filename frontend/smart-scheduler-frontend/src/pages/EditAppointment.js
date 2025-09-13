import { useMutation, useQueryClient } from "@tanstack/react-query";

const EditAppointment = ({ appointment, handleCloser }) => {
  const queryClient = useQueryClient();
  const updateAppointment = useMutation({
    mutationFn: (updatedData) => {
      // API call to update appointment
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      handleCloser();
    }
  });

  return <div>Edit Appointment</div>;
};

export default EditAppointment;
