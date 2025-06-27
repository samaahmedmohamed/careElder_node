const serviceModel = require("../Model/servicesModel");
const catchAsync = require("../utilities/catchAsync");
const createService = catchAsync(async (req, res, next) => {
  const service = await serviceModel.create(req.body);
  res.status(201).json({
    status: "success",
    data: { service },
  });
});
const updateService = catchAsync(async (req, res, next) => {
  const serviceId = req.params.id;
  const existingservice = await serviceModel.findById(serviceId);
  if (!existingservice) {
    return res.status(404).json({
      status: "fail",
      message: "Service not found ",
    });
  }
  const updateService = await serviceModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  return res.status(200).json({
    status: "success",
    message: "Updated successfully",
    data: updateService,
  });
});
module.exports={createService,updateService}