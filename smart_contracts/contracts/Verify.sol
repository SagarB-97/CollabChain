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

	event verified(address _from, bool success);

	function add_process(uint _p_id, uint _n, uint[] memory _indices, 
                        uint[] memory _noutputs, uint _price) public payable returns (bool success) {
		process memory p = process(msg.sender, _n, _indices, _noutputs, _price);
		processes[_p_id] = p;
		return true;
	}

	function verify_output(uint _p_id, uint _m, uint[] memory _indices, uint[] memory _outputs) public returns (string memory success) {
		process memory p = processes[_p_id];
		uint i = 0;
		for(i = 0; i < p.n; i++)
		{
			if(p.indices[i] >= _indices[0])
				break;
		}
		for(uint j = 0; j < _m; j++)
		{
			if( (p.indices[i] == _indices[j]) && (_outputs[j] != p.n_outputs[i]) )
			{
				emit verified(msg.sender, false);
				return "false";
			}
			else if( (p.indices[i] == _indices[j]) && (_outputs[j] == p.n_outputs[i]) )
			{
				i++;
				if (i == p.n)
					break;
			}
		}
		msg.sender.transfer((p.price / p.n) * 1 ether);
		emit verified(msg.sender, true);
		return "true";
	}

	function show(uint d) public view returns (address a, uint[] memory i, uint[] memory o, uint p)
	{
		return (processes[d].submitter, processes[d].indices, processes[d].n_outputs, processes[d].price);
	}

	function getbalance() public view returns (uint a)
	{
		return (address(this).balance);
	}

}