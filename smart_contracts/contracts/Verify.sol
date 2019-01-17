pragma solidity ^0.5.0;

contract Verify {

	struct process {
		address submitter;
		uint n;
		uint[] indices;
		uint[] n_outputs;
		uint price;
	}

	mapping(uint => process) processes;

	function add_process(uint _p_id, uint _n, uint[] memory _indices, 
                        uint[] memory _noutputs, uint _price) public payable returns (bool success) {
		process memory p = process(msg.sender, _n, _indices, _noutputs, _price);
		processes[_p_id] = p;
		return true;
	}

	function verify_output(uint _p_id, uint _m, uint[] memory _indices, uint[] memory _outputs) public returns (bool success) {
		process memory p = processes[_p_id];
		for(uint i = 0; i < p.n; i++)
		{
			if(p.indices[i] > _indices[0])
			{
				for (uint j = 0; j < _m; j++)
				{
					if(p.indices[i] == _indices[j])
					{
						if(_outputs[j] == p.n_outputs[i])
						{
							msg.sender.transfer(p.price/p.n);
							delete processes[_p_id];
							return true;
						}
						else return false;
					}
				}
			}
		}
		return false;
	}

}