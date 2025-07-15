import LeaveRequest  from "../models/leaverequest.js";


export const createLeaveRequest = async (req, res) => {
  try{
    const { employeeId, leaveType, startDate, endDate, reason } = req.body;

    if (!employeeId || !leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newLeaveRequest = new LeaveRequest({
      employeeId,
      leaveType,
      startDate,
      endDate,
      reason,
      
    });

    await newLeaveRequest.save();
    return res.status(201).json({ message: "Leave request created successfully!", leaveRequest: newLeaveRequest });
  }catch (error) {
    console.error("Error creating leave request:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


export const getAllLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find().populate('employeeId', 'firstName lastName');
    return res.status(200).json({ message: "Leave requests fetched successfully!", leaveRequests });
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const getLeaveRequestById = async (req, res) => {
  try {
    const leaveRequestId = req.params.id;
    const leaveRequest = await LeaveRequest.findById(leaveRequestId).populate('employeeId', 'firstName lastName');

    if (!leaveRequest) {
      return res.status(404).json({ message: "Leave request not found!" });
    }

    return res.status(200).json({ message: "Leave request fetched successfully!", leaveRequest });
  } catch (error) {
    console.error("Error fetching leave request:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const approveLeaveRequest = async (req, res) => {
  try {
    const leaveRequestId = req.params.id;
    const leaveRequest = await LeaveRequest.findById(leaveRequestId);
    if (!leaveRequest) {
      return res.status(404).json({ message: "Leave request not found!" });
    }
    leaveRequest.status = 'approved';
    await leaveRequest.save();
    return res.status(200).json({ message: "Leave request approved successfully!", leaveRequest });
  } catch (error) {
    console.error("Error approving leave request:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
