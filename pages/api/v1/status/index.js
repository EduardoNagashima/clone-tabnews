function status(request, response) {
  response.status(200).json({ key: "Top demais" });
}

export default status;
